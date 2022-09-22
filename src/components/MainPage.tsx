import { useEffect, useState } from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import { ArticleType } from "../types/ArticleType";
import Article from "./Article";

const MainPage = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [errorOccurred, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      let response = await fetch(
        "https://api.spaceflightnewsapi.net/v3/articles"
      );
      if (response.ok) {
        const articlesArray = await response.json();
        console.log(articlesArray);
        setArticles(articlesArray);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="text-center mt-4">
      <h1 className="text-white my-5">SPACE ARTICLES: ARTICLES FROM SPAAAAACE</h1>
      {loading && (
        <Spinner className="mx-auto mt-3" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {!loading && errorOccurred && (
        <Alert className="m-1" variant="danger">
          There was an error retrieving the articles
        </Alert>
      )}

      {!loading && !errorOccurred && articles.length > 0 && (
        <Container>
          <Row xs={1} md={4} className="g-4">
            {articles.map((article) => (
              <Article
                article={article}
              />
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default MainPage;
