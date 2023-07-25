import { Embla } from '@mantine/carousel';

interface CarouselState {
	scrollProgress: number;
	embla: Embla | null;
}

type CarouselAction = CarouseScrollAction | CarouseEmblaAction;

interface CarouseScrollAction {
	type: CarouselActionType.SCROLL;
	progress: number;
}

interface CarouseEmblaAction {
	type: CarouselActionType.EMBLA;
	embla: Embla;
}

export const initialState: CarouselState = {
	scrollProgress: 0,
	embla: null,
};

export enum CarouselActionType {
	SCROLL = 'scroll_progressed',
	EMBLA = 'set_embla_api',
}

export const carouselReducer = (
	state: CarouselState,
	action: CarouselAction
) => {
	switch (action.type) {
		case CarouselActionType.SCROLL: {
			return {
				...state,
				scrollProgress: action.progress,
			};
		}
		case CarouselActionType.EMBLA: {
			return {
				...state,
				embla: action.embla,
			};
		}
	}
};
