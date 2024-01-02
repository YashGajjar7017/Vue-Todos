import { Plugin } from 'vue';
import component from '../src/components/masonry-wall.vue';
declare type InstallableComponent = typeof component & Plugin;
declare const MasonryWall: InstallableComponent;
export default MasonryWall;
