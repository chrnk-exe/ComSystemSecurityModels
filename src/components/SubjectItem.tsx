import React, { useState } from 'react';
import { ClickAwayListener, TextField } from '@mui/material';
import onEnterPress from '../onEnterPress';

const SubjectItem = ({
	id,
	value,
	changeSubjectName,
}: {
	id: number;
    value: string;
	changeSubjectName(id: number, newName: string): void;
}) => {
	const [input, setInput] = useState(false);
	
	return (
		<ClickAwayListener onClickAway={() => setInput(false)}>
			{input ? (
				<TextField
					size='small'
					variant='filled'
					margin='none'
					onKeyDown={(e) => onEnterPress(e, setInput)}
					value={value}
					onChange={e => changeSubjectName(id, e.target.value)}
				/>
			) : (
				<div style={{fontSize: '1.5em', fontWeight: 700}} onClick={() => setInput(true)}>{id}. {value}</div>
			)}
		</ClickAwayListener>
	);
};

export default SubjectItem;
