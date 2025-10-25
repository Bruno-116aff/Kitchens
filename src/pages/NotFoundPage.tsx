import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
	return (
		<div className='not-found-page'>
			<div className='container'>
				<div
					style={{
						padding: '4rem 0',
						textAlign: 'center',
						maxWidth: '600px',
						margin: '0 auto',
					}}
				>
					<h1>404 - Page Not Found</h1>
					<p>The page you are looking for could not be found.</p>
					<p>
						It might have been moved, deleted, or you entered the wrong URL.
					</p>

					<div style={{ marginTop: '2rem' }}>
						<Link to='/' className='btn btn--primary btn--lg'>
							Go Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
