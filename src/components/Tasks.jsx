import { useState } from 'react';
import { months } from './constants';

export default function Tasks({ tasks }) {
  const [task = []] = tasks;
  const [on, setOn] = useState(true);
  const [onTwo, setOnTwo] = useState(true);
  const [onThree, setOnThree] = useState(true);
  const [onFour, setOnFour] = useState(true);
  function monthDiff(firstMonth, lastMonth) {
    let months;
    months = (lastMonth.getFullYear() - firstMonth.getFullYear()) * 12;
    months -= firstMonth.getMonth();
    months += lastMonth.getMonth();
    return months <= 0 ? 0 : months;
  }
  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }
  function getDayOfWeek(year, month, day) {
    const daysOfTheWeekArr = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const dayOfTheWeekIndex = new Date(year, month, day).getDay();
    return daysOfTheWeekArr[dayOfTheWeekIndex];
  }
  function dayDiff(startDate, endDate) {
    const difference =
      new Date(endDate).getTime() - new Date(startDate).getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    return days;
  }
  function createFormattedDateFromStr(year, month, day) {
    let monthStr = month.toString();
    let dayStr = day.toString();

    if (monthStr.length === 1) {
      monthStr = `0${monthStr}`;
    }
    if (dayStr.length === 1) {
      dayStr = `0${dayStr}`;
    }
    return `${year}-${monthStr}-${dayStr}`;
  }
  const fromData = `${task.period}`;
  function periodMonth(fromData) {
    let arr = fromData.split('-')[0].split('.');
    let arrMonth = parseInt(arr[1]);
    return arrMonth;
  }
  function periodYear(fromData) {
    let arr = fromData.split('-')[0].split('.');
    let arrYear = parseInt(arr[2]);
    return arrYear;
  }
  function periodMonthEnd(fromData) {
    let arr = fromData.split('-')[1].split('.');
    let arrMonth = parseInt(arr[1]);
    return arrMonth;
  }
  function periodYearEnd(fromData) {
    let arr = fromData.split('-')[1].split('.');
    let arrYear = parseInt(arr[2]);
    return arrYear;
  }
  const timeRange = {
    fromSelectMonth: periodMonth(fromData) - 1,
    fromSelectYear: periodYear(fromData),
    toSelectMonth: periodMonthEnd(fromData) - 1,
    toSelectYear: periodYearEnd(fromData),
  };

  const taskDurations = [
    {
      id: 1,
      start: `${task.chart.period_start}`,
      end: `${task.chart.period_end}`,
      task: 1,
      background: '#E2EBFF',
      border: '1px solid #497CF6',
    },
    {
      id: 2,
      start: `${task.chart.sub[0].period_start}`,
      end: `${task.chart.sub[0].period_end}`,
      task: 2,
      background: '#FFF2E0',
      border: '1px solid #FFA530',
      display: `${on}`,
    },
    {
      id: 3,
      start: `${task.chart.sub[0].sub[0].period_start}`,
      end: `${task.chart.sub[0].sub[0].period_end}`,
      task: 3,
      background: '#CFF0D6',
      border: '1px solid #2DB77B',
      display: `${on && onTwo}`,
    },
    {
      id: 4,
      start: `${task.chart.sub[0].sub[0].sub[0].period_start}`,
      end: `${task.chart.sub[0].sub[0].sub[0].period_end}`,
      task: 4,
      background: '#CFF0D6',
      border: '1px solid #2DB77B',
      display: `${on && onTwo && onThree}`,
    },
    {
      id: 5,
      start: `${task.chart.sub[0].sub[0].sub[0].sub[0].period_start}`,
      end: `${task.chart.sub[0].sub[0].sub[0].sub[0].period_end}`,
      task: 5,
      background: '#FFF2E0',
      border: '1px solid #FFA530',
      display: `${on && onTwo && onFour && onThree}`,
    },
    {
      id: 6,
      start: `${task.chart.sub[0].sub[0].sub[0].sub[0].period_start}`,
      end: `${task.chart.sub[0].sub[0].sub[0].sub[0].period_end}`,
      task: 6,
      background: '#FFF2E0',
      border: '1px solid #FFA530',
      display: `${on && onTwo && onFour && onThree}`,
    },
  ];

  const ganttTimePeriodMons = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '210px',
    outline: '0.5px solid var(--color-outline)',
    textAlign: 'center',
    height: 'var(--cell-height)',
  };
  const ganttTimePeriod = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '30px',
    outline: '0.5px solid var(--color-outline)',
    textAlign: 'center',
    height: 'var(--cell-height)',
  };

  const ganttTimePeriodSpan = {
    margin: 'auto',
  };

  const ganttTimePeriodCell = {
    position: 'relative',
    outline: '0.5px solid var(--color-outline)',
    marginTop: '0.5px',
  };

  const taskDuration = {
    position: 'absolute',
    height: 'calc(var(--cell-height) - 1px)',
    zIndex: '1',
    borderRadius: 'var(--border-radius)',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.05)',
    cursor: 'move',
  };

  const startMonth = new Date(
    parseInt(timeRange.fromSelectYear),
    timeRange.fromSelectMonth
  );
  const endMonth = new Date(
    parseInt(timeRange.toSelectYear),
    timeRange.toSelectMonth
  );
  const numMonths = monthDiff(startMonth, endMonth) + 1;
  let month = new Date(startMonth);

  let monthRows = [];
  let dayRows = [];
  let dayRow = [];
  let taskRows = [];
  let taskRow = [];
  let mnth = new Date(startMonth);
  for (let i = 0; i < numMonths; i++) {
    const curYear = mnth.getFullYear();
    const curMonth = mnth.getMonth() + 1;

    monthRows.push(
      <div
        key={i}
        style={{
          ...ganttTimePeriodMons,
        }}
      >
        <div className="gantt-color">
          {`01 ${months[month.getMonth()]}`} -{`07 ${months[month.getMonth()]}`}
        </div>
        <div className="gantt-color">
          {`08 ${months[month.getMonth()]}`} -{`14 ${months[month.getMonth()]}`}
        </div>
        <div className="gantt-color">
          {`15 ${months[month.getMonth()]}`} -{`21 ${months[month.getMonth()]}`}
        </div>
        <div className="gantt-color">
          {`22 ${months[month.getMonth()]}`} -{`28 ${months[month.getMonth()]}`}
        </div>
      </div>
    );

    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
    for (let j = 1; j <= numDays; j++) {
      let dayOfTheWeek;
      if (i === 0) {
        dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);
      } else if (i === 1) {
        dayOfTheWeek = getDayOfWeek(curYear, curMonth, j - 1);
      } else {
        dayOfTheWeek = getDayOfWeek(curYear, curMonth + 1, j - 1);
      }

      dayRow.push(
        <div
          key={j}
          style={{
            ...ganttTimePeriod,
            backgroundColor:
              dayOfTheWeek === 'S' ? 'var(--color-tertiary)' : '#fff',
          }}
        >
          <span style={ganttTimePeriodSpan}>{j}</span>
        </div>
      );
    }

    dayRows.push(
      <div
        key={i}
        style={{
          ...ganttTimePeriod,
          outline: '0.5px solid var(--color-outline)',
        }}
      >
        {dayRow}
      </div>
    );

    dayRow = [];
    month.setMonth(month.getMonth() + 1);
  }

  if (taskDurations) {
    taskDurations.forEach((task) => {
      let mnth = new Date(startMonth);
      for (let i = 0; i < numMonths; i++) {
        const curYear = mnth.getFullYear();
        const curMonth = mnth.getMonth() + 1;

        const numDays = getDaysInMonth(curYear, curMonth);

        for (let j = 1; j <= numDays; j++) {
          const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);
          const formattedDate = createFormattedDateFromStr(
            curYear,
            curMonth,
            j
          );

          taskRow.push(
            <div
              key={`${task.id}-${j}`}
              style={{
                ...ganttTimePeriodCell,
                backgroundColor:
                  dayOfTheWeek === 'S' ? 'var(--color-tertiary)' : '#fff',
              }}
              data-task={task?.id}
              data-date={formattedDate}
            >
              {taskDurations.map((el, i) => {
                if (el?.task === task?.id && el?.start === formattedDate) {
                  return (
                    <div
                      key={`${i}-${el?.id}`}
                      style={{
                        ...taskDuration,
                        width: `calc(${dayDiff(
                          el?.start,
                          el?.end
                        )} * 100% - 1px)`,
                        backgroundColor: `${el.background}`,
                        border: `${el.border}`,
                        display: `${el.display}` === 'false' ? 'none' : 'block',
                      }}
                    ></div>
                  );
                }
                return null;
              })}
            </div>
          );
        }

        taskRows.push(
          <div key={`${i}-${task?.id}`} style={ganttTimePeriod}>
            {taskRow}
          </div>
        );

        taskRow = [];
        mnth.setMonth(mnth.getMonth() + 1);
      }
    });
  }
  return (
    <div>
      <div className="gantt-wrapper">
        <h2 className="gantt-title">
          {task.project}/ <span>{task.period}</span>
        </h2>
        <button className="gantt-export">
          <img
            src={require('../assets/svg/download.svg').default}
            alt="button"
          />
          Export
        </button>
      </div>

      <div id="gantt-container">
        <div id="gantt-grid-container">
          <div id="gantt-grid-container__tasks">
            <div className="gantt-task-row">Work item</div>
            <div className="gantt-task-row"></div>

            <div className="gantt-task-row">
              <button onClick={() => setOn(!on)} className="gantt__link">
                <img
                  src={require('../assets/svg/button.svg').default}
                  alt="button"
                />
              </button>
              <div>
                <img
                  className="gantt__img"
                  src={require('../assets/svg/icon-11.svg').default}
                  alt="button"
                />
              </div>
              <span className="gantt__span">1</span>
              {task.chart.title}
            </div>
            {on ? (
              <div>
                <div className="gantt-task-row">
                  <button
                    onClick={() => setOnTwo(!onTwo)}
                    className="gantt__link gantt-2"
                  >
                    <img
                      src={require('../assets/svg/button.svg').default}
                      alt="button"
                    />
                  </button>
                  <div>
                    <img
                      className="gantt__img"
                      src={require('../assets/svg/icon-22.svg').default}
                      alt="button"
                    />
                  </div>
                  <span className="gantt__span">1</span>
                  {task.chart.sub[0].title}
                </div>
                {onTwo ? (
                  <div>
                    <div className="gantt-task-row">
                      <button
                        onClick={() => setOnThree(!onThree)}
                        className="gantt__link gantt-3"
                      >
                        <img
                          src={require('../assets/svg/button.svg').default}
                          alt="button"
                        />
                      </button>
                      <div>
                        <img
                          className="gantt__img"
                          src={require('../assets/svg/icon-3.svg').default}
                          alt="button"
                        />
                      </div>
                      <span className="gantt__span">1</span>
                      {task.chart.sub[0].sub[0].title}
                    </div>
                    {onThree ? (
                      <div>
                        <div className="gantt-task-row">
                          <button
                            onClick={() => setOnFour(!onFour)}
                            className="gantt__link gantt-4"
                          >
                            <img
                              src={require('../assets/svg/button.svg').default}
                              alt="button"
                            />
                          </button>
                          <div>
                            <img
                              className="gantt__img"
                              src={require('../assets/svg/icon-4.svg').default}
                              alt="button"
                            />
                          </div>
                          <span className="gantt__span">2</span>
                          {task.chart.sub[0].sub[0].sub[0].title}
                        </div>
                        {onFour ? (
                          <div>
                            <div className="gantt-task-row">
                              <button className="gantt__link gantt-5">
                                <img
                                  src={
                                    require('../assets/svg/button.svg').default
                                  }
                                  alt="button"
                                />
                              </button>
                              <div>
                                <img
                                  className="gantt__img"
                                  src={
                                    require('../assets/svg/icon-5.svg').default
                                  }
                                  alt="button"
                                />
                              </div>
                              <span className="gantt__span">0</span>
                              {task.chart.sub[0].sub[0].sub[0].sub[0].title}
                            </div>
                            <div className="gantt-task-row">
                              <button className="gantt__link gantt-5">
                                <img
                                  src={
                                    require('../assets/svg/button.svg').default
                                  }
                                  alt="button"
                                />
                              </button>
                              <div>
                                <img
                                  className="gantt__img"
                                  src={
                                    require('../assets/svg/icon-5.svg').default
                                  }
                                  alt="button"
                                />
                              </div>
                              <span className="gantt__span">0</span>
                              {task.chart.sub[0].sub[0].sub[0].sub[1].title}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div
            id="gantt-grid-container__time"
            style={{ gridTemplateColumns: `repeat(${numMonths}, 1fr)` }}
          >
            {/* <div className="month-day"></div> */}
            {monthRows}
            {dayRows}
            <div
              id="gantt-time-period-cell-container"
              style={{
                gridColumn: '1/-1',
                display: 'grid',
                gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
                paddingLeft: '0.5px',
              }}
            >
              {taskRows}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

