import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 180,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}),
);

export default function CuratedDropdown() {
	const classes = useStyles();
	const history = useHistory();
	const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
		history.push(event.target.value)
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">Curated DataGroups</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					onChange={handleChange}
					label="Curated DataGroups"

				>
					<MenuItem value={'/demo/details/1/kaya'}>US Historical KAYA, (1949-2020)</MenuItem>
					<MenuItem value={'/demo/details/2/AEO2021'}>Annual Energy Outlook 2021 KAYA, (2020-2050)</MenuItem>

				</Select>
			</FormControl>

		</div>
	);
}
