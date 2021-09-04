import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContentMain from "../../../components/Cyberbugs/Main/ContentMain";
import { GET_PROJECT_DETAIL_SAGA } from "../../constants/Cyberbugs/Cyberbug";
import HeaderMain from "../../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../../components/Cyberbugs/Main/InfoMain";

export default function IndexCyberBugs(props) {
  let { projectDetail } = useSelector((state) => state.ProjectDetailReducer);
  const dispatch = useDispatch();
  console.log(projectDetail);
  useEffect(() => {
    // Khi người dùng link qua trag này bàng thẻ navlink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url => gọi saga
    const { projectId } = props.match.params;

    dispatch({ type: GET_PROJECT_DETAIL_SAGA, projectId });
  }, []);
  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <h3>{projectDetail.projectName}</h3>
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
