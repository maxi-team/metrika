export type TrackerOptions = {
  /**
   * Tracking host
   * @default 'an.all.mini-team.space'
   */
  readonly host?: string;

  /**
   * API key
   * @default 'NONE'
   */
  readonly key?: string;

  /**
   * Default params to send
   * @default {}
   */
  readonly params?: Record<string, unknown>;

  /**
   * Randomize REST path
   * @default true
   */
  readonly randomize?: boolean;
};

export type TrackerParams = Record<string, unknown>;
