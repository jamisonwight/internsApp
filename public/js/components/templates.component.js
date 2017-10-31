export default class template {
  intern(id, name) {
    // Intern Template block
    return
      `<tbody>
        <tr id="intern-${id}" class="fade-in">
          <td class="col-xs-1">
            <h3 class="halftopmargin halfbottommargin">${id}</h3>
          </td>
          <td class="col-xs-6">
              <div id="openInfo-${id}" class="panel panel-default halftopmargin hide">
                  <div class="panel-heading">
                      <a class="info-open" data-info="${id}" href="#">
                          <span class="glyphicon glyphicon-chevron-up"></span> ${name}
                      </a>
                  </div>
                  <div class="panel-body">
                    <h3 class="pull-left">Internship Information</h3>
                    <table class="col-xs-12 table table-striped">
                      <thead>
                        <tr>
                          <th>Programs Completed</th>
                          <th>&nbsp;</th>
                          <th>Grades</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody id="programInfo-${id}"></tbody>
                    </table>
                  </div>
                </div>
                <div id="closeInfo-${id}" class="panel panel-default halftopmargin halfbottommargin">
                    <div class="panel-heading">
                        <a class="info-close" data-info="${id}" href="#">
                            <span class="glyphicon glyphicon-chevron-down"></span> ${name}
                        </a>
                    </div>
                </div>
              </div>
          </td>
          <td class="col-xs-3" id="program-${id}"> 
            <span id="counter-${id}" class="counter">0</span>
            <i id="programCount-${id}" data-programs="${id}" class="internProgramsCount glyphicon glyphicon-education halftopmargin halfbottommargin"></i> 
            <i data-programs="${id}" class="internPrograms glyphicon glyphicon-plus "></i>
          </td>
          <td class="col-xs-3"><i data-intern="${id}" class="internRemove glyphicon glyphicon-trash halftopmargin halfbottommargin"></i></td>
        </tr>
      </tr>
    </tbody>`
  }

  program(program, gradeId) {
    return
      `<tr class="fade-in">
        <td>${program}<td>
        <td id="grade-${gradeId}">${grade}%</td>
        <td><i data-grade="${gradeId}" class="gradeEdit glyphicon glyphicon-pencil"></i></td>
    </tr>`
  }
}