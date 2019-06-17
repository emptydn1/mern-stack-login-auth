import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = {
	paper: {
		padding: 10,
		display: 'flex',
		marginTop: 10,
	},
	avatar: {
		minWidth: 10,
		margin: '4px 10px 4px 4px'
	},
	login: {
		marginBottom: 5
	},
	time: {
		marginLeft: 10,
		color: '#bbb',
		fontSize: 14
	}
}

class Post extends Component {
    render() {
		const { value, classes } = this.props;
		// console.log((new Date(value.date)));
		// console.log(Date.parse(value.date));
		// console.log(value.date);
		// console.log((new Date(value.date).toLocaleString()));
		// console.log(value.date.toLocaleString());
		// console.log((new Date(Date.now())));
		// console.log(Date.now());
        return (
			<Paper className={classes.paper}>
				<div 
					className={classes.avatar}
					style={{
										//slice tra ve 1 mang gia tri, co'  chi so tu begin den end 
                                        //use the first 3 letter of user.id for backgroundcolor
						backgroundColor: `#${value.user.id.slice(value.user.id.length - 3)}`
					}}
				/>
				<div>
					<h3 className={classes.login}>
                                                            {/* format date */}
						<span className={classes.time}>{(new Date(value.date)).toLocaleString()}</span>
					</h3>
					{value.text}
				</div>
			</Paper>
        );
    }
}

export default withStyles(styles)(Post)