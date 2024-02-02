import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { useSelector } from "react-redux";

const Favourites = () => {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites.favourites);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  console.log(favourites);

  return (
    <Container fluid>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {favourites.map((favourite) => (
          <Col key={favourite.name.official} className="mt-5">
            <Card className="h-100">
              <Card.Img
                variant="top"
                className="rounded h-50"
                src={favourite.flags.png}
                style={{
                  objectFit: "cover",
                  minHeight: "200px",
                  maxHeight: "200px",
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{favourite.name.common}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted">
                  {favourite.name.official}
                </Card.Subtitle>
                <ListGroup
                  variant="flush"
                  className="flex-grow-1 justify-content-end"
                >
                  <ListGroup.Item>
                    <i className="bi bi-translate me-2"></i>
                    Language:
                    {favourite.languages
                      ? Object.values(favourite.languages).join(", ")
                      : "No language specified"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="bi bi-cash-coin me-2"></i>
                    Currency:
                    {Object.values(favourite.currencies || {})
                      .map((currency) => currency.name)
                      .join(", ")}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <i className="bi bi-people me-2"></i>
                    Population: {favourite.population.toLocaleString()}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favourites;
