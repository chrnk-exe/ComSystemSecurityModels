import React, { useState } from 'react';
import { Select, MenuItem, Box, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { Grant } from '../../store/slices/MatrixSlice';

import ArrowForward from '@mui/icons-material/ArrowForward';

const GrantComponent = () => {
	const Subjects = useAppSelector(state =>
		state.matrix.Subjects.map(Subj => ({ id: Subj.id, name: Subj.name })),
	);

	const [parentSubject, setParentSubject] = useState<number>(1);
	const [childSubject, setChildSubject] = useState<number>(1);

	const dispatch = useAppDispatch();

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center">
			<Box display="flex" alignItems="center">
				<Select
					label="Parent"
					onChange={e => {
						setParentSubject(+e.target.value);
					}}
					defaultValue={parentSubject}>
					{Subjects.map(subj => (
						<MenuItem key={subj.id} value={subj.id}>
							{subj.name}
						</MenuItem>
					))}
				</Select>
				<Box>
					<ArrowForward />
				</Box>
				<Select
					label="Child"
					onChange={e => {
						setChildSubject(+e.target.value);
					}}
					defaultValue={childSubject}>
					{Subjects.map(subj => (
						<MenuItem key={subj.id} value={subj.id}>
							{subj.name}
						</MenuItem>
					))}
				</Select>
			</Box>

			<Box marginTop="10px">
				<Button
					startIcon={<ArrowForward />}
					variant="outlined"
					color="primary"
					onClick={() =>
						dispatch(
							Grant({
								SubjectsParent: parentSubject,
								SubjectChild: childSubject,
							}),
						)
					}>
					Grant rights
				</Button>
			</Box>
		</Box>
	);
};

export default GrantComponent;
