import React, { useState } from 'react';
import {
	Box,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Button,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import CreateIcon from '@mui/icons-material/Create';

import { Create } from '../../store/slices/MatrixSlice';

const CreateComponent = () => {
	const [newSubjectName, setName] = useState<string>('');

	

	const [valid, setValid] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const ObjectNames = useAppSelector(state =>
		state.matrix.Objects.map(obj => obj.name),
	);


	const [rules, setRules] = useState<Rules[]>(
		ObjectNames.map(() => [false, false]),
	);

	const handleRuleChange = (value: 'R' | 'W', index: number) => {
		const newRules: Rules[] = [...rules];
		const rule = value === 'R' ? 0 : 1;
		console.log(newRules, newRules[index][rule]);
		newRules[index][rule] = !newRules[index][rule];
		setRules(newRules);
	};

	const handleSubjectName = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { value } = e.target;
		setName(value);
		setValid(value === '');

		// if(ObjectNames.includes(value))setValid(true)
		// else setValid(false)
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center">
			<TextField
				// error={valid}
				// helperText={valid ? 'The object already exists' : ''}
				placeholder="Subject Name"
				value={newSubjectName}
				onChange={handleSubjectName}
			/>
			<Box
				display="flex"
				justifyContent="flex-start"
				alignItems="center"
				gap="5px"
				marginTop="5px">
				{ObjectNames.map((name, index) => (
					<Box
						key={index}
						display="flex"
						flexDirection="column"
						gap="5px">
						{name}
						<ToggleButtonGroup
							onChange={(e, value) =>
								handleRuleChange(value[0], index)
							}>
							<ToggleButton
								selected={rules[index][0]}
								value={'R'}>
								R
							</ToggleButton>
							<ToggleButton
								selected={rules[index][1]}
								value={'W'}>
								W
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
				))}
			</Box>
			<Button
				sx={{
					marginTop: '10px',
				}}
				variant="outlined"
				disabled={valid}
				startIcon={<CreateIcon />}
				onClick={() => {
					dispatch(Create({ name: newSubjectName, rules }));
					setRules(ObjectNames.map(() => [false, false]));
				}}>
				Create
			</Button>
		</Box>
	);
};

export default CreateComponent;
