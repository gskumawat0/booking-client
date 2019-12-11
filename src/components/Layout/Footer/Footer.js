import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
	return (
		<footer className="bg-dark py-3 text-white px-md-5">
			<div className="text-center">
				made with{' '}
				<span className="text-danger px-2">
					{' '}
					<FontAwesomeIcon icon={faHeart} />{' '}
				</span>
				by{' '}
				<a href="https://github.com/gskumawat0" rel="noopener noreferrer" className="font-italic">
					gskumawat
				</a>
			</div>
		</footer>
	);
};

export default Footer;
