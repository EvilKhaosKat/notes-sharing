import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class ShareButton extends Component {
	render() {
		return (
			<Button className="shareButton">
				<i className="fas fa-share-alt"></i>
			</Button>
		);
	}
}

export default ShareButton;
