import React from 'react';

export default (e: React.KeyboardEvent, setInput: (act: boolean) => void) => {
	if(e.code === 'Enter'){
		setInput(false);
	}
};