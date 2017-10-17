
define(function (require, exports, module) {
    module.exports = {
      row: `
        <tbody>
          <tr id="intern-${id}" class="fade-in">
            <td class="col-xs-1">
              <h3 class="halftopmargin halfbottommargin">${id}</h3>
            </td>
            <td class="col-xs-6">
                <div id="openInfo-${id}" class="panel panel-default halftopmargin hide">
                    <div class="panel-heading">
                        <a class="info-open" data-info="${id}" href="#">
                            <span class="glyphicon glyphicon-chevron-up"></span> Expanded Panel
                        </a>
                    </div>
                    <div class="panel-body">This is an expanded panel</div>
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
    }; 
  });