import { create } from "zustand";

type HeaderState = {
    includeNav: boolean;
    includeModal: boolean;
}

const useHeaderStore = create<HeaderState>(() => ({

    includeNav: true,
    includeModal: false,

}));

export default useHeaderStore;