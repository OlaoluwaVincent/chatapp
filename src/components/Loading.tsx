import { Vortex } from 'react-loader-spinner';

const Loading = () => {
	return (
		<Vortex
			visible={true}
			height='80'
			width='80'
			ariaLabel='vortex-loading'
			wrapperStyle={{
				backgroundColor: '#277cf2;',
				height: '100vh',
				width: '100vw',
			}}
			wrapperClass='vortex-wrapper'
			colors={[
				'#8babd8',
				'#78e378',
				'#f71735',
				'#707991',
				'#011627',
				'#1a9cff',
			]}
		/>
	);
};

export default Loading;
