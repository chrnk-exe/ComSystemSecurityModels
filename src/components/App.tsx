import React, { useState, useEffect } from 'react';
import {
	Button,
	Box,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Select,
	MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

import classes from '../styles/App.module.sass';

import ObjectItem from './ObjectItem';
import SubjectItem from './SubjectItem';
import CellItem from './CellItem';
import Create from './functions/Create';
import Remove from './functions/Remove';
import Grant from './functions/Grant';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
	changeObject,
	addNewSubject,
	addNewObject,
	deleteObject,
	deleteSubject,
	changeSubjectName,
	changeRule,
} from '../store/slices/MatrixSlice';

const storage = window.localStorage;

type page = 'matrix' | 'check';
type functionState = 'Grant' | 'Remove' | 'Create';

export default function App() {
	const [select, setSelect] = useState(1);

	const [input, setInput] = useState<string>('');
	const [output, setOutput] = useState<string>('');

	const [page, setPage] = useState<page>('check');
	const [functionSelect, setFunction] = useState<functionState>('Grant');

	const data = useAppSelector(state => state.matrix);
	const dispatch = useAppDispatch();

	useEffect(() => {
		storage.setItem('state', JSON.stringify(data));
	}, [data]);

	const downLoadMatrix = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		function download(filename: string, text: string) {
			const element = document.createElement('a');
			element.setAttribute(
				'href',
				'data:application/json;charset=utf-8,' + JSON.stringify(text),
			);
			element.setAttribute('download', filename);

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();
			document.body.removeChild(element);
			// Start file download.
		}
		download(`matrix_${Date.now()}.json`, JSON.stringify(data));
	};

	const checkRulesInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const userRules = data.Subjects.find(subj => subj.id === select)?.rules;
		if (userRules) {
			let start =
				e.target.value.length < input.length ? e.target.value : input;
			if (e.target.value.length > input.length) {
				const i = e.target.value.length - 1;
				const letterID = data.Objects.find(
					obj => obj.name === e.target.value[i],
				)?.id as number;
				const rules = userRules[letterID - 1];
				if (rules && rules[1]) {
					start += e.target.value[i];
				}
			}
			setInput(start);
			setOutput(input2output(start, select));
		}
	};

	const input2output = (input: string, select: number) => {
		const userRules = data.Subjects.find(subj => subj.id === select)
			?.rules as Rules[];
		let finish = '';
		for (let i = 0; i < input.length; i++) {
			const letterID = data.Objects.find(obj => obj.name === input[i])
				?.id as number;
			const rules = userRules[letterID - 1];
			if (rules[0]) finish += input[i];
		}
		return finish;
	};

	if (page === 'check') {
		return (
			<div className={classes.App}>
				<Box
					display={'flex'}
					flexDirection="column"
					justifyContent="flex-start"
					alignItems="space-around">
					<Box
						border="1px solid lightgrey"
						padding="20px"
						bgcolor="#FFFFF1"
						marginBottom={'20px'}>
						<h1>Select function</h1>
						<Select
							onChange={e =>
								setFunction(e.target.value as functionState)
							}
							defaultValue={functionSelect}>
							<MenuItem value="Grant">Grant</MenuItem>
							<MenuItem value="Remove">Remove</MenuItem>
							<MenuItem value="Create">Create</MenuItem>
						</Select>
						<Box margin="20px">
							{functionSelect === 'Grant' && <Grant />}
							{functionSelect === 'Remove' && <Remove />}
							{functionSelect === 'Create' && <Create />}
						</Box>
					</Box>
					<Box
						bgcolor="#FFFFF1"
						display="grid"
						gridTemplateColumns="1fr 3fr 1fr"
						border="1px solid lightgrey"
						padding="20px"
						gap="10px">
						<Select
							onChange={e => {
								setSelect(e.target.value as number);
								setOutput(
									input2output(
										input,
										e.target.value as number,
									),
								);
							}}
							defaultValue={select}>
							{data.Subjects.map(subj => (
								<MenuItem key={subj.id} value={subj.id}>
									{subj.name}
								</MenuItem>
							))}
						</Select>
						<Box display="flex" flexDirection="column" gap="10px">
							<TextField
								label="input"
								value={input}
								onChange={checkRulesInput}
							/>
							<TextField label="output" value={output} disabled />
						</Box>
						<Box>
							<Button
								onClick={() => {
									setInput('');
									setOutput('');
								}}
								variant="outlined">
								Clear
							</Button>
						</Box>
					</Box>
				</Box>

				<Button
					variant="contained"
					className={classes.downLoadMatrix}
					onClick={() => setPage('matrix')}>
					Show matrix
				</Button>
			</div>
		);
	} else
		return (
			<div className={classes.App}>
				<TableContainer className={classes.Table} component={Paper}>
					<Table
						sx={{
							'& .MuiTableCell-root': {
								borderLeft: '1px solid rgba(224, 224, 224, 1)',
							},
						}}>
						<TableHead>
							<TableRow
								sx={{
									height: '100px',
								}}>
								<TableCell />
								{data.Objects.map(object => (
									<TableCell key={object.id}>
										<Box
											display="flex"
											justifyContent="space-evenly"
											alignItems="center">
											<ObjectItem
												id={object.id}
												value={object.name}
												setData={(id, newName) =>
													dispatch(
														changeObject({
															id,
															newName,
														}),
													)
												}
											/>
											<Button
												// fullWidth
												variant="outlined"
												color="error"
												onClick={() =>
													dispatch(
														deleteObject(object.id),
													)
												}>
												<CancelIcon />
											</Button>
										</Box>
									</TableCell>
								))}
								<TableCell size="small">
									<Button
										variant="outlined"
										startIcon={<AddIcon />}
										onClick={() =>
											dispatch(addNewObject())
										}>
										Add new Object
									</Button>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.Subjects.map(row => (
								<TableRow key={row.id}>
									<TableCell>
										<SubjectItem
											key={row.id}
											id={row.id}
											value={row.name}
											changeSubjectName={(id, newName) =>
												dispatch(
													changeSubjectName({
														id,
														newName,
													}),
												)
											}
										/>
									</TableCell>
									{data.Objects.map(object => (
										<TableCell
											align="center"
											key={object.id}>
											<CellItem
												key={object.id * row.id}
												OID={object.id}
												SID={row.id}
												changeRule={(
													RuleID,
													ObjectID,
													SubjectID,
												) =>
													dispatch(
														changeRule({
															RuleID,
															ObjectID,
															SubjectID,
														}),
													)
												}
												rules={row.rules[object.id - 1]}
											/>
										</TableCell>
									))}
									<TableCell>
										<Button
											variant="outlined"
											color="error"
											startIcon={<DeleteIcon />}
											onClick={() =>
												dispatch(deleteSubject(row.id))
											}>
											Delete this subject
										</Button>
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell>
									<Button
										variant="outlined"
										startIcon={<AddIcon />}
										onClick={() =>
											dispatch(addNewSubject())
										}>
										Add new subject
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Button
					variant="contained"
					className={classes.downLoadMatrix}
					onClick={downLoadMatrix}>
					Download Matrix
				</Button>
				<Button
					variant="contained"
					className={classes.downLoadMatrix2}
					onClick={() => setPage('check')}>
					Check rules
				</Button>
				<Button
					variant="contained"
					className={classes.downLoadMatrix3}
					onClick={() => storage.clear()}>
					Clear storage
				</Button>
			</div>
		);
}
