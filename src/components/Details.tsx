import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { Alert, Button, Image, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ArticleType } from "../types/ArticleType";

const Details = () => {
  const [article, setArticle] = useState<ArticleType>();
  const [errorOccurred, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const fetchArticle = async () => {
    try {
      setLoading(true);
      let response = await fetch(
        "https://api.spaceflightnewsapi.net/v3/articles/" + params.articleId
      );
      if (response.ok) {
        const fetchedArticle = await response.json();
        console.log(fetchedArticle);
        setArticle(fetchedArticle);
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
    fetchArticle();
  }, []);

  return (
    <div className="text-center">
      {loading && (
        <div>
          <span className="sr-only">Loading...</span>
          <Spinner
            className="mx-auto mt-3"
            animation="border"
            role="status"
          ></Spinner>
        </div>
      )}

      {!loading && errorOccurred && (
        <Alert className="m-1" variant="danger">
          There was an error retrieving the articles
        </Alert>
      )}

      {!loading && !errorOccurred && article !== undefined && (
        <div className="text-white">
          <h1 className="mt-5">{article.title}</h1>
            <Image src={article.imageUrl} className="my-3" style={{width: "50rem"}} />
            <div>
                <div>
                    <span>{"Published " +
              formatDistance(new Date(article.publishedAt), new Date(), {
                addSuffix: true,
              })}</span>
                </div>
                <p className="my-2">{article.summary}</p>
                <div className="my-3">

                <Button variant="info" href={article.url}>Read More</Button>
                </div>
            </div>
            

          <Link to="/" className="nav-link text-white pe-auto">
            Back to Articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default Details;
