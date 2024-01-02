/* eslint-disable no-unused-vars */
import type {
  DefineComponent,
  ComponentOptionsMixin,
  VNodeProps,
  AllowedComponentProps,
  ComponentCustomProps,
  ExtractPropTypes,
  Ref,
} from 'vue';
declare type Column = number[];
declare const _sfc_main: DefineComponent<
  {
    columnWidth: {
      type: NumberConstructor;
      required: false;
      default: number;
    };
    items: {
      type: ArrayConstructor;
      required: true;
    };
    gap: {
      type: NumberConstructor;
      required: false;
      default: number;
    };
    rtl: {
      type: BooleanConstructor;
      required: false;
      default: boolean;
    };
    ssrColumns: {
      type: NumberConstructor;
      required: false;
      default: number;
    };
  },
  {
    props: {
      columnWidth: number;
      items: unknown[];
      gap: number;
      rtl: boolean;
      ssrColumns: number;
    };
    columnWidth: Ref<number>;
    items: Ref<unknown[]>;
    gap: Ref<number>;
    rtl: Ref<boolean>;
    ssrColumns: Ref<number>;
    columns: Ref<number[][]>;
    wall: Ref<HTMLDivElement>;
    emit: {
      (event: 'redraw'): void;
      (event: 'redraw-skip'): void;
    };
    columnCount: () => number;
    createColumns: (count: number) => Column[];
    fillColumns: (itemIndex: number) => Promise<void>;
    redraw: (force?: boolean) => Promise<void>;
    resizeObserver: ResizeObserver;
  },
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ('redraw' | 'redraw-skip')[],
  'redraw' | 'redraw-skip',
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<
    ExtractPropTypes<{
      columnWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
      };
      items: {
        type: ArrayConstructor;
        required: true;
      };
      gap: {
        type: NumberConstructor;
        required: false;
        default: number;
      };
      rtl: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
      };
      ssrColumns: {
        type: NumberConstructor;
        required: false;
        default: number;
      };
    }>
  > & {
    onRedraw?: ((...args: any[]) => any) | undefined;
    'onRedraw-skip'?: ((...args: any[]) => any) | undefined;
  },
  {
    columnWidth: number;
    gap: number;
    rtl: boolean;
    ssrColumns: number;
  }
>;
export default _sfc_main;
