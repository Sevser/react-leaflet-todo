
import { IPoint } from '../../types/Point/IPoint';
import { eventbus } from './eventBus';

export const showOnMapChannel = eventbus<{
  showOnMap: (payload: { center: IPoint, zoom: number }) => void
}>()