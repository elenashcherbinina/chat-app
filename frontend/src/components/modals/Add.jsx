import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useChatContext } from '../../contexts';

const Add = ({ hideModal, channels }) => {
  const { addChannel } = useChatContext();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const channelsNames = channels.map((channel) => channel.name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.length'))
      .max(20, t('errors.length'))
      .notOneOf(channelsNames, t('errors.notOneOf')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: async (value, { setSubmitting }) => {
      try {
        await addChannel(value);
        setSubmitting(true);
        hideModal();
      } catch (error) {
        setSubmitting(false);
        console.error(error.message);
      } finally {
        inputRef.current.focus();
      }
    },
  });

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('headers.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className='visually-hidden'>{t('headers.channelName')}</Form.Label>
            <Form.Control
              id='name'
              name='name'
              type='text'
              placeholder={t('headers.channelName')}
              onChange={formik.handleChange}
              value={formik.values.name}
              className='mb-2'
              ref={inputRef}
              disabled={formik.isSubmitting}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3 gap-2 d-flex justify-content-end'>
            <Button variant='secondary' onClick={hideModal}>
              {t('buttons.canсel')}
            </Button>
            <Button variant='primary' type='submit' disabled={formik.isSubmitting}>
              {t('buttons.send')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
