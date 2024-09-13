'use client'; // Обязательно указываем 'use client', чтобы сделать компонент клиентским

import { Provider } from 'react-redux';
import { store } from './store'; // Ваш store

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
