const API_KEY = "Il0WiM4zKuksoGaIN5epXQ==SsiTaU4acyuLrWLP";
const API_URL = "https://api.api-ninjas.com/v1/quotes";
const { useState, useEffect } = React;

const QuoteWindow = () => {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const getRandomQuote = async () => {
		setLoading(true);
		setError(false);
		try {
			const response = await fetch(API_URL, {
				headers: { "X-Api-Key": API_KEY }
			});
			if (!response.ok) {
				throw new Error("Error while fetching quote!");
			}
			const data = await response.json();
			const fetchedQuote = data[0].quote;
			const fetchedAuthor = "- " + data[0].author;
			setQuote(fetchedQuote);
			setAuthor(fetchedAuthor);
		} catch (error) {
			setError(true);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getRandomQuote();
	}, []);

	return (
		<div
			style={{ minHeight: "450px", borderRadius: "30px" }}
			className="d-flex flex-column align-items-center justify-content-between col-12 col-lg-6 col-md-8 col-sm-10 mx-auto p-4 text-center border shadow bg-white"
		>
			<div className="w-100 my-auto">
				{error ? (
					<p
						style={{ height: "100px ", width: "50%" }}
						className="bg-danger mx-auto"
					>
						An error occurred!
					</p>
				) : (
					<>
						<p
							className={
								"fw-bold text-transition fs-4 " + (loading ? "fade-out" : "fade-in")
							}
						>
							{quote}
						</p>
						<p className={"text-transition " + (loading ? "fade-out" : "fade-in")}>
							{author}
						</p>
					</>
				)}
			</div>
			<div className="w-100 mt-auto mb-2 d-flex justify-content-evenly">
				<a
					href="https://www.facebook.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="https://simpleicons.org/icons/facebook.svg"
						alt="Facebook"
						width="32"
						height="32"
					/>
				</a>
				<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
					<img
						src="https://simpleicons.org/icons/instagram.svg"
						alt="Instagram"
						width="32"
						height="32"
					/>
				</a>
				<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
					<img
						src="https://simpleicons.org/icons/linkedin.svg"
						alt="LinkedIn"
						width="32"
						height="32"
					/>
				</a>
			</div>
			<button
				style={{ height: "50px" }}
				className="w-50 btn btn-dark mt-3"
				disabled={loading}
				onClick={getRandomQuote}
			>
				{loading ? <div className="spinner-grow"></div> : "Generate"}
			</button>
		</div>
	);
};

ReactDOM.render(<QuoteWindow />, document.getElementById("react-container"));
