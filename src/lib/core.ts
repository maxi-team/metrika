import type {
  TrackerParams,
  TrackerOptions
} from '../types/types';

import {
  generateId,
  generateRandom,
  getLaunchParams,
  getHostWithProtocol,
  stringify,
  reformatDate
} from './helpers';

export class Tracker {
  private _host: string;
  private _key: string;
  private _randomize: boolean;

  private _ctx: TrackerParams;

  constructor(options: TrackerOptions) {
    this._host = getHostWithProtocol(options.host || 'collector.metrika.mini-team.space');
    this._key = options.key || 'NONE';
    this._randomize = !!options.randomize;

    const anonymousId = generateId();
    const launchParams = getLaunchParams(window.location.search.slice(1));
    const now = new Date();
    this._ctx = {
      event_id: '', // lazy
      utc_time: '', // lazy
      anonymous_id: anonymousId,
      tz_offset: now.getTimezoneOffset(),
      screen: screen.width + 'x' + screen.height,
      user_agent: navigator.userAgent,
      user_language: (navigator.languages && navigator.languages[0]) || navigator.language || (navigator as any).userLanguage || '',
      ...launchParams,
      ...options.params
    };

    this.track('user_identify', {});
  }

  private _sendJson(json: TrackerParams) {
    const req = new XMLHttpRequest();
    let url = `${this._host}/api/v1/event?token=${this._key}`;
    if (this._randomize) {
      url = `${this._host}/api.${generateRandom()}?p_${generateRandom()}=${this._key}`;
    }
    req.open('POST', url);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(stringify(json));
  }

  /**
   * Sends a track event to server
   */
  track(event_type: string, payload: TrackerParams = {}) {
    const now = new Date();
    this._ctx.utc_time = reformatDate(now.toISOString());
    this._ctx.event_id = generateId();
    this._sendJson({
      ...payload,
      event_type,
      src: 'eventn',
      api_key: this._key,
      eventn_ctx: this._ctx
    });
  }
}

let instance: Tracker | null = null;
export const initTracker = (options: TrackerOptions) => {
  if (instance !== null) {
    throw new Error('Tracker is already initialized');
  }
  instance = new Tracker(options);
};

export const getTracker = () => {
  if (instance === null) {
    throw new Error('Tracker is not initialized');
  }
  return instance;
};
