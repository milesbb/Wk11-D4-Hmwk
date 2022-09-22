import { format, formatDistance, subDays } from "date-fns";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArticleType } from "../types/ArticleType";

interface propsInterface {
  article: ArticleType;
}

const Article = ({ article }: propsInterface) => {
  return (
    <Col>
      <Link className="nav-link pe-auto" to={"/" + article.id}>
        <Card>
          <Card.Img variant="top" src={article.imageUrl} />

          <Card.Header>
            {"Published " +
              formatDistance(new Date(article.publishedAt), new Date(), {
                addSuffix: true,
              })}
          </Card.Header>
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.summary}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default Article;
