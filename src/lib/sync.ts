import { createClient } from '@/lib/supabase/client';
import { UserState, useStore } from '@/store/useStore';

// Supabase client instance
const supabase = createClient();

// Keep track of the last synced state to avoid redundant updates
let lastSyncedString = '';
let syncTimeout: NodeJS.Timeout | null = null;

/**
 * Extracts only the persisted (domain) fields from state to push to the cloud.
 * Strips transient sync metadata (syncStatus, lastSyncAt, syncError) so they
 * cannot be written to — or restored from — the database.
 */
const toPersistedPayload = (state: UserState) => ({
  done: state.done,
  streak: state.streak,
  totalTasks: state.totalTasks,
  totalMins: state.totalMins,
  restored: state.restored,
  hist: state.hist,
  favs: state.favs,
  readMins: state.readMins,
  medMins: state.medMins,
  pranaMins: state.pranaMins,
  lastDay: state.lastDay,
  journal: state.journal,
  userName: state.userName,
  hasSeenHabitHint: state.hasSeenHabitHint,
  hasSeenScienceHint: state.hasSeenScienceHint,
});

/**
 * Pushes the current Zustand state to Supabase.
 * Only persisted domain fields are synced — transient sync metadata is excluded.
 * Debounced to prevent spamming the database on rapid state changes.
 */
export const pushStateToCloud = (state: UserState) => {
  if (syncTimeout) clearTimeout(syncTimeout);

  // Build the payload from domain fields only, before the debounce timer fires,
  // so we capture the state at call time rather than the stale closure value.
  const payload = toPersistedPayload(state);
  const payloadString = JSON.stringify(payload);

  // Skip if nothing in the persisted slice actually changed.
  if (payloadString === lastSyncedString) return;

  syncTimeout = setTimeout(async () => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) return; // Guest mode, don't sync

      const { error } = await supabase
        .from('user_progress')
        .upsert({
          id: authData.user.id,
          state: payload,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) {
        console.error('Failed to sync progress to cloud:', error);
      } else {
        lastSyncedString = payloadString;
      }
    } catch (err) {
      console.error('Error pushing state to cloud:', err);
    }
  }, 2000); // 2 second debounce
};

/**
 * Pulls the latest state from Supabase and merges it into Zustand.
 * Call this on app load or login.
 */
export const pullStateFromCloud = async () => {
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) return false;

    const { data, error } = await supabase
      .from('user_progress')
      .select('state')
      .eq('id', authData.user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
      console.error('Failed to pull progress from cloud:', error);
      return false;
    }

    if (data && data.state) {
      const cloudState = data.state as Partial<UserState>;
      useStore.getState().syncFromServer(cloudState);
      lastSyncedString = JSON.stringify(useStore.getState());
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error pulling state from cloud:', err);
    return false;
  }
};
