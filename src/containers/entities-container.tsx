import React, { useContext, useEffect, useCallback } from "react";
import { AppContext } from "../reducers";
import { Spinner } from "../components/common/spinner";
import ShowMoreButton from "../components/common/show-more-button";

import {
  fetchEntityItems,
  entityItemsShowMore,
} from "../actions/entities/actions";
import ResponseErrorIndicator from "../components/common/response-error-indicator";
import config from "../config";
import { FilterObjectInterface } from "../reducers/types";

interface EntitiesContainerInterface {
  entityKey: string;
  endpoint: () => Promise<any>;
  children: (items: any[]) => React.ReactNode;
  initialFilter?: FilterObjectInterface
}

const EntitiesContainer: React.FC<EntitiesContainerInterface> = ({
  entityKey,
  endpoint,
  children,
  initialFilter
}) => {
  const { state, dispatch } = useContext(AppContext);
  const stableDispatch = useCallback(dispatch, []);

  const data = state.entities[entityKey];
  const page = data ? data.page : 1;

  useEffect(() => {
    stableDispatch(
      fetchEntityItems(entityKey, endpoint, page, config.PER_PAGE, initialFilter )
    );
  }, [stableDispatch, page, entityKey, endpoint, initialFilter]);

  if (!data) {
    return null;
  }

  const { items, total, perPage, loading, error } = data;

  if (error) {
    return <ResponseErrorIndicator error={error} />;
  }

  if (!loading && total === 0 && items.length === 0) {
    return <p>Список пуст</p>;
  }

  const handleShowMoreClick = () => {
    dispatch(entityItemsShowMore(entityKey));
  };

  return (
    <div className="posts-list-container">
      {children(items)}
      {loading && <Spinner />}
      <ShowMoreButton
        loading={loading}
        page={page}
        perPage={perPage}
        total={total}
        onClick={handleShowMoreClick}
      />
    </div>
  );
};

export default EntitiesContainer;
