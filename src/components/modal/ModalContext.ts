import { createContext, useContext } from 'react';

interface Context {
	buttonClose?: boolean;
	onClose?: () => void;
}

export const ModalContext = createContext<Context | null>(null);

export const useModalContext = () => {
	let context = useContext(ModalContext);

	if (!context)
		throw new Error(
			'Child components of Modal cannot be rendered outside the Modal component!'
		);

	return context;
};
