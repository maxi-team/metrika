export type TrackerOptions = {
  /**
   * Tracking host
   */
  readonly host?: string;

  /**
   * API key
   */
  readonly key?: string;

  /**
   * Default params to send
   */
  readonly params?: Record<string, unknown>;

  /**
   * Randomize REST path
   */
  readonly randomize?: boolean;
};

export type TrackerParams = Record<string, unknown>;
