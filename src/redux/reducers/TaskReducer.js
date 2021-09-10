import {
  CHANGE_TASK_MODAL,
  GET_TASK_DETAIL,
} from "../constants/Cyberbugs/Cyberbug.js";

const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 1,
      priority: "High",
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug",
    },
    assigness: [
      {
        id: 320,
        avatar: "https://ui-avatars.com/api/?name=admin",
        name: "admin",
        alias: "admin",
      },
    ],
    lstComment: [],
    taskId: 1039,
    taskName: "Task3",
    alias: "task3",
    description:
      '<p><span style="background-color: #2dc26b;">CYBERSOFT</span></p>',
    statusId: "2",
    originalEstimate: 5,
    timeTrackingSpent: 3,
    timeTrackingRemaining: 0,
    typeId: 1,
    priorityId: 1,
    projectId: 1137,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      return { ...state, taskDetailModal: action.taskDetailModal };
    }
    case CHANGE_TASK_MODAL: {
      const { name, value } = action;
      return {
        ...state,
        taskDetailModal: { ...state.taskDetailModal, [name]: value },
      };
    }
    default:
      return { ...state };
  }
};