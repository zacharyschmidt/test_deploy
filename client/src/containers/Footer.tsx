import React from 'react';
import { AppBar, Button, makeStyles, Container, Toolbar, Typography, Theme, Link } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const BlackTextTypography = withStyles({
	root: {
		color: "#000000"
	}
})(Typography);

export default function Footer() {
	return (
		<AppBar position="static" >

			<Toolbar style={{
				background: '#d3d3d3'
			}}>
				<BlackTextTypography style={{
					marginRight: '1.5rem',
					display: 'flex',
					justifyContent: 'left',
					flex: 1,
					textDecoration: 'none',
					color: 'black',


				}
				} variant="body1">
					Contact: <Link style={{ marginLeft: '5px' }} href="mailto:jon@koomey.com">Jonathan Koomey</Link>,
					<Link style={{ marginLeft: '5px' }} href="mailto:zacharym.schmidt@gmail.com">Zachary Schmidt</Link>
				</BlackTextTypography>
				<BlackTextTypography style={{
					marginRight: '1.5rem',
					display: 'flex',
					justifyContent: 'flex-end',
					flex: 1,
					textDecoration: 'none',
					color: 'black'
				}
				} variant="body1">
					&copy; 2021 Koomey Analytics
				</BlackTextTypography>

			</Toolbar>

		</AppBar>
	)
}

