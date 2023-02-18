import { Vortex } from 'react-loader-spinner';
interface Props {
	height?: string;
	width?: string;
}
const Loading = ({ height, width }: Props) => {
	return (
		<Vortex
			visible={true}
			height={height ? height : '500'}
			width={width ? width : '500'}
			ariaLabel='vortex-loading'
			wrapperStyle={
				!height && !width
					? {
							backgroundColor: 'inherit',
							height: '100vh',
							width: '100vw',
					  }
					: undefined
			}
			wrapperClass='vortex-wrapper'
			colors={[
				'#8babd8',
				'#78e378',
				'#f71735',
				'#707991',
				'#011627',
				'#ffffff',
			]}
		/>
	);
};

export default Loading;
