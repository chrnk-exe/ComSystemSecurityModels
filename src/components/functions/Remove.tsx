import React, { useState } from 'react';
import {
	Select,
	MenuItem,
	Box,
	Button,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { Remove } from '../../store/slices/MatrixSlice';

import DeleteIcon from '@mui/icons-material/Delete';


const RemoveComponent = () => {
	const Subjects = useAppSelector(state =>
		state.matrix.Subjects.map(Subj => ({ id: Subj.id, name: Subj.name })),
	);

	const [selectedSubject, setSelectedSubject] = useState<number>(1);

	const dispatch = useAppDispatch();

	const ObjectNames = useAppSelector(state =>
		state.matrix.Objects.map(obj => obj.name),
	);

	const [rules, setRules] = useState<Rules[]>(ObjectNames.map(() => [false, false] as Rules));

	const handleRuleChange = (value: 'R' | 'W', index: number) => {
		const newRules: Rules[] = [...rules];
		const rule = value === 'R' ? 0 : 1;
		console.log(newRules, newRules[index][rule]);
		newRules[index][rule] = !newRules[index][rule];
		setRules(newRules);
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center">
			<Select
				onChange={e => {
					setSelectedSubject(+e.target.value);
				}}
				defaultValue={selectedSubject}>
				{Subjects.map(subj => (
					<MenuItem key={subj.id} value={subj.id}>
						{subj.name}
					</MenuItem>
				))}
			</Select>
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
			<Box marginTop="10px">
				<Button
					startIcon={<DeleteIcon />}
					variant="outlined"
					color="error"
					onClick={() => dispatch(Remove({id: selectedSubject, rules}))}>
					Remove rights
				</Button>
			</Box>
		</Box>
	);
};

export default RemoveComponent;
