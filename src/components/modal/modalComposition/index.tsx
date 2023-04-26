import { FC } from 'react';
import Header, { HeaderProps } from '@components/modal/modalComposition/Header';
import Footer, { FooterProps } from '@components/modal/modalComposition/Footer';
import Content, {
	ContentProps,
} from '@components/modal/modalComposition/Content';

export interface ModalComposition {
	Header: FC<HeaderProps>;
	Content: FC<ContentProps>;
	Footer: FC<FooterProps>;
}

export { Header, Footer, Content };
