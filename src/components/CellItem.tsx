import React from 'react';
import classes from '../styles/CellItem.module.sass';

const CellItem = ({
	OID,
	SID,
	rules,
	changeRule,
}: {
	OID: number;
	SID: number;
	rules: Rules;
	changeRule(RuleID: 0 | 1, ObjectID: number, SubjectID: number): void;
}) => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '10px'
		}}>
			<p
				className={
					rules[0]
						? [classes.cellItemP].join(' ')
						: [classes.cellItemP, classes.notallow].join(' ')
				}
				onClick={() => changeRule(0, OID, SID)}>
				{rules[0] ? 'Read allowed' : 'Read now Allowed'}
			</p>
			<p
				className={
					rules[1]
						? [classes.cellItemP].join(' ')
						: [classes.cellItemP, classes.notallow].join(' ')
				}
				onClick={() => changeRule(1, OID, SID)}>
				{rules[1] ? 'Write allowed' : 'Write not allowed'}
			</p>
		</div>
	);
};

export default CellItem;
