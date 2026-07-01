export type LiveRundownStatus =
  | "Completed"
  | "Current"
  | "Upcoming"
  | "Delayed"
  | "Skipped"
  | "Cancelled";

export interface LiveRundownEventRecord {
  id?: string;
  weddingId: string;
  sequence: number;
  status: LiveRundownStatus;
  time: string;
  scheduledTime: string;
  actualStartTime: string;
  expectedDuration: string;
  actualDuration: string;
  delay: string;
  program: string;
  usedTime: string;
  foodServing: string;
  song: string;
  screen: string;
  remarks: string;
  responsibleRoles: string[];
  coordinator: string;
  shiftedTime?: string;
  updatedAt?: string;
}

export const LIVE_RUNDOWN_EVENTS_COLLECTION = "liveRundownEvents";

export const createLiveRundownEventRecord = (
  input: Partial<LiveRundownEventRecord> & { weddingId: string; program: string; sequence: number },
): LiveRundownEventRecord => ({
  id: input.id,
  weddingId: input.weddingId,
  sequence: input.sequence,
  status: input.status ?? "Upcoming",
  time: input.time ?? "",
  scheduledTime: input.scheduledTime ?? "",
  actualStartTime: input.actualStartTime ?? "—",
  expectedDuration: input.expectedDuration ?? "0 mins",
  actualDuration: input.actualDuration ?? "0 mins",
  delay: input.delay ?? "—",
  program: input.program,
  usedTime: input.usedTime ?? "0 mins",
  foodServing: input.foodServing ?? "-",
  song: input.song ?? "",
  screen: input.screen ?? "",
  remarks: input.remarks ?? "",
  responsibleRoles: input.responsibleRoles ?? [],
  coordinator: input.coordinator ?? "",
  shiftedTime: input.shiftedTime,
  updatedAt: input.updatedAt ?? new Date().toISOString(),
});

export const normalizeLiveRundownEventRecord = (
  event: Partial<LiveRundownEventRecord> & { id?: string },
): LiveRundownEventRecord =>
  createLiveRundownEventRecord({
    id: event.id,
    weddingId: event.weddingId ?? "demo-wedding",
    sequence: event.sequence ?? 0,
    status: event.status,
    time: event.time ?? "",
    scheduledTime: event.scheduledTime ?? "",
    actualStartTime: event.actualStartTime ?? "—",
    expectedDuration: event.expectedDuration ?? "0 mins",
    actualDuration: event.actualDuration ?? "0 mins",
    delay: event.delay ?? "—",
    program: event.program ?? "",
    usedTime: event.usedTime ?? "0 mins",
    foodServing: event.foodServing ?? "-",
    song: event.song ?? "",
    screen: event.screen ?? "",
    remarks: event.remarks ?? "",
    responsibleRoles: event.responsibleRoles ?? [],
    coordinator: event.coordinator ?? "",
    shiftedTime: event.shiftedTime,
    updatedAt: event.updatedAt ?? new Date().toISOString(),
  });

export const prepareLiveRundownFirestorePayload = (
  input: LiveRundownEventRecord,
): Record<string, unknown> => ({
  weddingId: input.weddingId,
  sequence: input.sequence,
  status: input.status,
  time: input.time,
  scheduledTime: input.scheduledTime,
  actualStartTime: input.actualStartTime,
  expectedDuration: input.expectedDuration,
  actualDuration: input.actualDuration,
  delay: input.delay,
  program: input.program,
  usedTime: input.usedTime,
  foodServing: input.foodServing,
  song: input.song,
  screen: input.screen,
  remarks: input.remarks,
  responsibleRoles: input.responsibleRoles,
  coordinator: input.coordinator,
  shiftedTime: input.shiftedTime ?? input.scheduledTime,
  updatedAt: input.updatedAt ?? new Date().toISOString(),
});

export const getLiveRundownCollectionPath = (weddingId: string): string =>
  `${weddingId}/${LIVE_RUNDOWN_EVENTS_COLLECTION}`;

export const subscribeToLiveRundownEvents = (
  weddingId: string,
  onChange: (events: LiveRundownEventRecord[]) => void,
): (() => void) => {
  void weddingId;

  // Placeholder listener structure for the future Firestore integration.
  // Once Firebase is wired in, this should be replaced with onSnapshot over the
  // liveRundownEvents collection for the selected wedding workspace.
  onChange([]);

  return () => undefined;
};
