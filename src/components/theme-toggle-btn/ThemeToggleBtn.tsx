import { Group, Switch, useMantineColorScheme } from '@mantine/core';
import { DarkModeOutlined } from '@mui/icons-material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

interface Props {
	size: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMapper: {
	[key: string]: 'large' | 'medium' | 'small';
} = {
	xl: 'large',
	lg: 'medium',
	md: 'medium',
	sm: 'small',
};

export default function ThemeToggleBtn({ size }: Props) {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<Group>
			<Switch
				checked={colorScheme === 'dark'}
				onChange={() => toggleColorScheme()}
				size={size}
				onLabel={<LightModeOutlinedIcon fontSize={sizeMapper[size]} />}
				offLabel={<DarkModeOutlined fontSize={sizeMapper[size]} />}
			/>
		</Group>
	);
}
