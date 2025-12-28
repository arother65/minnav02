/*
* 
*/

// imports
import '../App.css'
import { Link } from 'react-router'

//
export default function NotFound404() {

	//
	return (
		<div className="App">
			<header className="App-header">
				<h2>404 not found</h2>
			</header>

			<main className="App-main">
			</main>

			<footer className="App-footer" >
				<nav>
					<Link className="App-link" to="/">Home</Link>
				</nav>
				<p>footer text</p>
			</footer>
		</div>
	)
}  // NotFound404()