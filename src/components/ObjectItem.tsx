import React, { useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import { TextField } from '@mui/material';
import onEnterPress from '../onEnterPress';

const ObjectItem = ({
	id,
	value,
	setData,
}: {
	id: number;
	value: string;
	setData(id: number, newName: string): void;
}) => {
	const [input, setInput] = useState(false);

	return (
		<ClickAwayListener onClickAway={() => setInput(false)}>
			{input ? (
				<TextField
					size="small"
					variant="filled"
					margin="none"
					onKeyDown={e => onEnterPress(e, setInput)}
					value={value}
					onChange={e => setData(id, e.target.value)}
				/>
			) : (
				<div
					style={{
						fontSize: '1.5em',
						fontWeight: 700,
						display: 'flex',
						justifyContent: 'center',
						// minWidth: '100px',
						// minHeight: '50px'
					}}
					onClick={() => setInput(true)}>
					{value}
				</div>
			)}
		</ClickAwayListener>
	);
};

export default ObjectItem;
