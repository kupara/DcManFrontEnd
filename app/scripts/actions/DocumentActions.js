import AppConstants from '../constants/AppConstants';
import BaseActions from './BaseActions';

export function createDoc(body, token) {
  BaseActions.post(
    '/documents',
    body,
    AppConstants.CREATE_DOC,
    token
  );
}

export function getUserDocs(userId, token) {
  BaseActions.get(
    `/users/${userId}/documents`,
    AppConstants.USER_DOCS,
    token
  );
}

export function getDoc(docId, token) {
  BaseActions.get(
    `/documents/${docId}`,
    AppConstants.GET_ONE_DOC,
    token
  );
}

export function getAllDocs(token) {
  BaseActions.get(
    '/documents',
    AppConstants.GET_ALL_DOCS,
    token
  );
}

export function deleteDoc(docID, token) {
  BaseActions.delete(
    `/documents/${docID}`,
    AppConstants.DELETE_DOC,
    token
  );
}

export function updateDoc(docID, updatedDoc, token) {
  BaseActions.put(
    `/documents/${docID}`,
    updatedDoc,
    AppConstants.UPDATE_DOC,
    token
  );
}
