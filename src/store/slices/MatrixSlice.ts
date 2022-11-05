import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const storage = window.localStorage;

const initialState: Data =
	storage.length !== 0 && storage.getItem('state') !== null
		? JSON.parse(storage.getItem('state') as string)
		: {
				Objects: [
					{ id: 1, name: 'A' },
					{ id: 2, name: 'B' },
				],
				Subjects: [
					{
						id: 1,
						name: 'admin',
						rules: [
							[true, true],
							[false, true],
						],
					},
					{
						id: 2,
						name: 'all_users',
						rules: [
							[false, true],
							[true, true],
						],
					},
				],
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  };

export const matrixSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeObject: (
			state,
			action: PayloadAction<{ id: number; newName: string }>,
		) => {
			const { id, newName } = action.payload;
			state.Objects = state.Objects.map(obj => {
				return obj.id === id ? { ...obj, name: newName } : obj;
			});
		},
		addNewSubject: state => {
			return {
				Objects: state.Objects,
				Subjects: [
					...state.Subjects,
					{
						id: state.Subjects.length + 1,
						name: 'Rename me!',
						rules: state.Objects.map(() => [false, false] as Rules),
					},
				],
			};
		},
		addNewObject: state => {
			return {
				Objects: [
					...state.Objects,
					{ id: state.Objects.length + 1, name: 'New Object' },
				],
				Subjects: state.Subjects.map(subj => ({
					...subj,
					rules: [...subj.rules, [false, false] as Rules],
				})),
			};
		},
		changeSubjectName: (
			state,
			action: PayloadAction<{ id: number; newName: string }>,
		) => {
			const { id, newName } = action.payload;
			state.Subjects = state.Subjects.map(subj => {
				return subj.id === id ? { ...subj, name: newName } : subj;
			});
		},
		deleteSubject: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			state.Subjects = state.Subjects.filter(subj => subj.id !== id).map(
				(subj, index) => ({ ...subj, id: index + 1 }),
			);
		},
		changeRule: (
			state,
			action: PayloadAction<{
				RuleID: 0 | 1;
				ObjectID: number;
				SubjectID: number;
			}>,
		) => {
			const { RuleID, ObjectID, SubjectID } = action.payload;

			state.Subjects = state.Subjects.map(subj => {
				if (subj.id === SubjectID) {
					subj.rules[ObjectID - 1][RuleID] =
						!subj.rules[ObjectID - 1][RuleID];
					return subj;
				} else return subj;
			});
		},
		deleteObject: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			state.Objects = state.Objects.filter(obj => obj.id !== id).map(
				(obj, index) => ({ ...obj, id: index + 1 }),
			);
			state.Subjects = state.Subjects.map(subj => ({
				...subj,
				rules: [
					...subj.rules.slice(0, id - 1),
					...subj.rules.slice(id),
				],
			}));
		},
		setRules: (
			state,
			action: PayloadAction<{ id: number; rules: Rules[] }>,
		) => {
			const { id, rules } = action.payload;
			state.Subjects[id - 1].rules = [...rules];
		},
		Grant: (
			state,
			action: PayloadAction<{
				SubjectsParent: number;
				SubjectChild: number;
			}>,
		) => {
			const { SubjectsParent, SubjectChild } = action.payload;
			const parentRules = state.Subjects[SubjectsParent - 1].rules;
      state.Subjects.map(subj => {
        if(subj.id === SubjectChild){
          for (let i = 0; i < parentRules.length; i++) {
						for (let j = 0; j < 2; j++) {
							subj.rules[i][j] = parentRules[i][j]
								? true
								: subj.rules[i][j];
						}
					}
        } 
        return subj
      })
		},
		Remove: (
			state,
			action: PayloadAction<{ id: number; rules: Rules[] }>,
		) => {
			const { id, rules } = action.payload;
			console.log(id, rules);
			state.Subjects = state.Subjects.map(subj => {
				if (subj.id === id) {
					for (let i = 0; i < rules.length; i++) {
						for (let j = 0; j < 2; j++) {
							subj.rules[i][j] = rules[i][j]
								? false
								: subj.rules[i][j];
						}
					}
				}
				return subj;
			});
		},
		Create: (state, action: PayloadAction<Omit<ISubject, 'id'>>) => {
			const newSubject = action.payload;
			return {
				Objects: state.Objects,
				Subjects: [
					...state.Subjects,
					{
						id: state.Subjects.length + 1,
						name: newSubject.name,
						rules: newSubject.rules,
					},
				],
			};
		},
	},
});

export const {
	changeObject,
	addNewSubject,
	addNewObject,
	deleteObject,
	deleteSubject,
	changeSubjectName,
	changeRule,
	Grant,
	Remove,
	Create,
	setRules,
} = matrixSlice.actions;
export default matrixSlice.reducer;
