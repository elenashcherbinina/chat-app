import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';

export default function ErrorPage() {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const error = useRouteError();

  rollbar.error('Page not found', error);

  return (
    <Container fluid className='h-100'>
      <Row className='justify-content-center align-items-center h-100'>
        <Col className='md-12 text-center'>
          <span className='display-1 d-block'>{t('headers.404')}</span>
          <div className='mb-4 lead'>{t('messages.pageNotFound')}</div>
          <Link to={routes.rootPage}>{t('buttons.backHome')}</Link>
        </Col>
      </Row>
    </Container>
  );
}
