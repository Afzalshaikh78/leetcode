declare module "nprogress" {
  interface NProgressOptions {
    minimum?: number;
    easing?: string;
    speed?: number;
    trickle?: boolean;
    trickleSpeed?: number;
    showSpinner?: boolean;
    parent?: string;
    template?: string;
    barSelector?: string;
    spinnerSelector?: string;
  }

  const NProgress: {
    configure: (options: NProgressOptions) => void;
    start: () => void;
    done: () => void;
    set: (value: number) => void;
    inc: (amount?: number) => void;
    isStarted: () => boolean;
  };

  export default NProgress;
}
