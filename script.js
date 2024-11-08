// Khởi tạo dữ liệu
class Organization {
    constructor(name) {
        this.id = Date.now();
        this.name = name;
    }
}

class Department {
    constructor(orgId, name, code) {
        this.id = Date.now();
        this.orgId = orgId;
        this.name = name;
        this.code = code;
    }
}

class Employee {
    constructor(deptId, empId, name, gender, birthYear, position, overtime) {
        this.id = Date.now();
        this.deptId = deptId;
        this.empId = empId;
        this.name = name;
        this.gender = gender;
        this.birthYear = birthYear;
        this.position = position;
        this.overtime = overtime;
        this.salary = this.calculateSalary(position, overtime);
    }

    calculateSalary(position, overtime) {
        const baseValue = 1800;
        const overtimeRate = 20;
        return (salaryCoefficients[position] * baseValue) + (overtime * overtimeRate);
    }
}

class Evaluation {
    constructor(empId, scores) {
        this.empId = empId;
        this.scores = scores;
        this.totalScore = this.calculateTotalScore(scores);
        this.rating = this.getRating(this.totalScore);
    }

    calculateTotalScore(scores) {
        return scores.reduce((sum, score) => sum + score.score, 0);
    }

    getRating(totalScore) {
        if (totalScore < 20) return 'Kém';
        if (totalScore < 40) return 'Bình thường';
        if (totalScore < 50) return 'Tốt';
        return 'Xuất sắc';
    }
}

// Quản lý dữ liệu
let organizations = [];
let departments = [];
let employees = [];
let evaluations = [];

const evaluationCriteria = [
    { id: 1, name: "Đạo đức nghề nghiệp, tác phong" },
    { id: 2, name: "Tinh thần đồng đội" },
    { id: 3, name: "Kỹ năng giao tiếp" },
    { id: 4, name: "Thái độ, năng lực" },
    { id: 5, name: "Khả năng lĩnh hội kiến thức" },
    { id: 6, name: "Tinh thần trách nhiệm" },
    { id: 7, name: "Kỹ năng sắp xếp thời gian" },
    { id: 8, name: "Khả năng sáng tạo" },
    { id: 9, name: "Kỹ năng tổ chức, điều phối" },
    { id: 10, name: "Tuân thủ pháp luật" }
];

const salaryCoefficients = {
    "Trưởng phòng": 5.0,
    "Phó phòng": 4.0,
    "Nhân viên": 2.0
};

// Quản lý Tổ chức
document.getElementById('orgForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newOrg = new Organization(document.getElementById('orgName').value);
    organizations.push(newOrg);
    updateOrgList();
    updateOrgSelect();
    this.reset();
    showAlert('Thêm tổ chức thành công!', 'success');
});

// Các hàm cập nhật danh sách tổ chức
function updateOrgList() {
    const list = document.getElementById('orgList');
    list.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Tên tổ chức</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                ${organizations.map(org => `
                    <tr>
                        <td>${org.name}</td>
                        <td>
                            <button onclick="editOrg(${org.id})">Sửa</button>
                            <button onclick="deleteOrg(${org.id})">Xóa</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Quản lý Phòng ban
document.getElementById('deptForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newDept = new Department(
        document.getElementById('orgSelect').value,
        document.getElementById('deptName').value,
        document.getElementById('deptCode').value
    );
    departments.push(newDept);
    updateDeptList();
    updateDeptSelect();
});
    // Tiếp tục Quản lý Phòng ban
function updateDeptList() {
    const list = document.getElementById('deptList');
    list.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Mã phòng ban</th>
                    <th>Tên phòng ban</th>
                    <th>Thuộc tổ chức</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                ${departments.map(dept => `
                    <tr>
                        <td>${dept.code}</td>
                        <td>${dept.name}</td>
                        <td>${getOrgName(dept.orgId)}</td>
                        <td>
                            <button onclick="editDept(${dept.id})">Sửa</button>
                            <button onclick="deleteDept(${dept.id})">Xóa</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Quản lý Nhân viên
document.getElementById('empForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newEmp = new Employee(
        document.getElementById('deptSelect').value,
        document.getElementById('empId').value,
        document.getElementById('empName').value,
        document.getElementById('empGender').value,
        document.getElementById('empBirthYear').value,
        document.getElementById('empPosition').value,
        document.getElementById('empOvertime').value
    );
    employees.push(newEmp);
    updateEmpList();
    updateEmpSelect();
    this.reset();
    showAlert('Thêm nhân viên thành công!', 'success');
});

function updateEmpList() {
    const list = document.getElementById('empList');
    list.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Mã NV</th>
                    <th>Họ tên</th>
                    <th>Giới tính</th>
                    <th>Năm sinh</th>
                    <th>Chức vụ</th>
                    <th>Phòng ban</th>
                    <th>Lương</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                ${employees.map(emp => `
                    <tr>
                        <td>${emp.empId}</td>
                        <td>${emp.name}</td>
                        <td>${emp.gender}</td>
                        <td>${emp.birthYear}</td>
                        <td>${emp.position}</td>
                        <td>${getDeptName(emp.deptId)}</td>
                        <td>${emp.salary.toLocaleString()}đ</td>
                        <td>
                            <button onclick="editEmp(${emp.id})">Sửa</button>
                            <button onclick="deleteEmp(${emp.id})">Xóa</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Đánh giá nhân viên
function initEvaluation() {
    const criteriaContainer = document.getElementById('evalCriteria');
    criteriaContainer.innerHTML = evaluationCriteria.map(criteria => `
        <div class="eval-criteria">
            <label>${criteria.name}:
                <input type="number" min="0" max="6" 
                       name="criteria_${criteria.id}" required>
            </label>
        </div>
    `).join('');
}

document.getElementById('evalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const empId = document.getElementById('empEvalSelect').value;
    const scores = evaluationCriteria.map(criteria => ({
        criteriaId: criteria.id,
        score: parseInt(document.querySelector(`[name="criteria_${criteria.id}"]`).value)
    }));

    const newEvaluation = new Evaluation(empId, scores);
    evaluations.push(newEvaluation);
    updateEvalList();
    this.reset();
    showAlert('Đánh giá nhân viên thành công!', 'success');
});

function updateEvalList() {
    const list = document.getElementById('evalList');
    list.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Mã NV</th>
                    <th>Tên NV</th>
                    <th>Tổng điểm</th>
                    <th>Xếp loại</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                ${evaluations.map(eval => {
                    const emp = employees.find(e => e.id == eval.empId);
                    return `
                        <tr>
                            <td>${emp ? emp.empId : 'N/A'}</td>
                            <td>${emp ? emp.name : 'N/A'}</td>
                            <td>${eval.totalScore}</td>
                            <td>${eval.rating}</td>
                            <td>
                                <button onclick="deleteEval(${eval.empId})">Xóa</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

// Các hàm hỗ trợ
function getOrgName(orgId) {
    const org = organizations.find(o => o.id == orgId);
    return org ? org.name : 'Không xác định';
}

function getDeptName(deptId) {
    const dept = departments.find(d => d.id == deptId);
    return dept ? dept.name : 'Không xác định';
}

// Các hàm xóa
function deleteOrg(id) {
    if (confirm('Bạn có chắc muốn xóa tổ chức này?')) {
        organizations = organizations.filter(o => o.id != id);
        updateOrgList();
        updateOrgSelect();
        showAlert('Xóa tổ chức thành công!', 'success');
    }
}

function deleteDept(id) {
    if (confirm('Bạn có chắc muốn xóa phòng ban này?')) {
        departments = departments.filter(d => d.id != id);
        updateDeptList();
        updateDeptSelect();
        showAlert('Xóa phòng ban thành công!', 'success');
    }
}

function deleteEmp(id) {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
        employees = employees.filter(e => e.id != id);
        updateEmpList();
        showAlert('Xóa nhân viên thành công!', 'success');
    }
}

function deleteEval(empId) {
    if (confirm('Bạn có chắc muốn xóa đánh giá này?')) {
        evaluations = evaluations.filter(e => e.empId != empId);
        updateEvalList();
        showAlert('Xóa đánh giá thành công!', 'success');
    }
}

// Các hàm cập nhật select
function updateOrgSelect() {
    const select = document.getElementById('orgSelect');
    select.innerHTML = `<option value="">Chọn tổ chức</option>
        ${organizations.map(org => `<option value="${org.id}">${org.name}
            }</option>`).join('')}`;
}

function updateDeptSelect() {
    const select = document.getElementById('deptSelect');
    select.innerHTML = `<option value="">Chọn phòng ban</option>
        ${departments.map(dept => `<option value="${dept.id}">${dept.name}</option>`).join('')}`;
}

function updateEmpSelect() {
    const select = document.getElementById('empEvalSelect');
    select.innerHTML = `<option value="">Chọn nhân viên</option>
        ${employees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('')}`;
}

// Hàm in danh sách nhân viên
function printEmployeeList() {
    const reportContent = document.getElementById('reportContent');
    reportContent.innerHTML = `
        <h3>Danh sách Nhân viên</h3>
        <table>
            <thead>
                <tr>
                    <th>Mã NV</th>
                    <th>Họ tên</th>
                    <th>Giới tính</th>
                    <th>Năm sinh</th>
                    <th>Chức vụ</th>
                    <th>Phòng ban</th>
                    <th>Lương</th>
                </tr>
            </thead>
            <tbody>
                ${employees.map(emp => `
                    <tr>
                        <td>${emp.empId}</td>
                        <td>${emp.name}</td>
                        <td>${emp.gender}</td>
                        <td>${emp.birthYear}</td>
                        <td>${emp.position}</td>
                        <td>${getDeptName(emp.deptId)}</td>
                        <td>${emp.salary.toLocaleString()}đ</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Hàm in báo cáo đánh giá
function printEvaluationReport() {
    const reportContent = document.getElementById('reportContent');
    reportContent.innerHTML = `
        <h3>Báo cáo Đánh giá Nhân viên</h3>
        <table>
            <thead>
                <tr>
                    <th>Mã NV</th>
                    <th>Tên NV</th>
                    <th>Tổng điểm</th>
                    <th>Xếp loại</th>
                </tr>
            </thead>
            <tbody>
                ${evaluations.map(eval => {
                    const emp = employees.find(e => e.id == eval.empId);
                    return `
                        <tr>
                            <td>${emp ? emp.empId : 'N/A'}</td>
                            <td>${emp ? emp.name : 'N/A'}</td>
                            <td>${eval.totalScore}</td>
                            <td>${eval.rating}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

// Hàm in tiêu chuẩn đánh giá
function printEvaluationCriteria() {
    const reportContent = document.getElementById('reportContent');
    reportContent.innerHTML = `
        <h3>Tiêu chuẩn Đánh giá</h3>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tiêu chí</th>
                </tr>
            </thead>
            <tbody>
                ${evaluationCriteria.map(criteria => `
                    <tr>
                        <td>${criteria.id}</td>
                        <td>${criteria.name}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Hàm hiển thị thông báo
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Lưu dữ liệu vào Local Storage
function saveToLocalStorage() {
    localStorage.setItem('organizations', JSON.stringify(organizations));
    localStorage.setItem('departments', JSON.stringify(departments));
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('evaluations', JSON.stringify(evaluations));
}

// Tải dữ liệu từ Local Storage
function loadFromLocalStorage() {
    organizations = JSON.parse(localStorage.getItem('organizations')) || [];
    departments = JSON.parse(localStorage.getItem('departments')) || [];
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    evaluations = JSON.parse(localStorage.getItem('evaluations')) || [];
}

// Khởi tạo ứng dụng
window.addEventListener('load', function() {
    loadFromLocalStorage();
    updateOrgList();
    updateDeptList();
    updateEmpList();
    updateEvalList();
    updateOrgSelect();
    updateDeptSelect();
    updateEmpSelect();
    initEvaluation();
});

// Sự kiện trước khi đóng trang
window.addEventListener('beforeunload', saveToLocalStorage);

// Các hàm chỉnh sửa
function editOrg(id) {
    const org = organizations.find(o => o.id === id);
    if (org) {
        document.getElementById('orgName').value = org.name;
        const submitBtn = document.querySelector('#orgForm button[type="submit"]');
        submitBtn.textContent = 'Cập nhật Tổ chức';
        submitBtn.onclick = function() {
            org.name = document.getElementById('orgName').value;
            updateOrgList();
            updateOrgSelect();
            document.getElementById('orgForm').reset();
            submitBtn.textContent = 'Thêm Tổ chức';
            submitBtn.onclick = null;
            showAlert('Cập nhật tổ chức thành công!', 'success');
        };
    }
}

function editDept(id) {
    const dept = departments.find(d => d.id === id);
    if (dept) {
        document.getElementById('orgSelect').value = dept.orgId;
        document.getElementById('deptName').value = dept.name;
        document.getElementById('deptCode').value = dept.code;
        const submitBtn = document.querySelector('#deptForm button[type="submit"]');
        submitBtn.textContent = 'Cập nhật Phòng ban';
        submitBtn.onclick = function() {
            dept.orgId = document.getElementById('orgSelect').value;
            dept.name = document.getElementById('deptName').value;
            dept.code = document.getElementById('deptCode').value;
            updateDeptList();
            updateDeptSelect();
            document.getElementById('deptForm').reset();
            submitBtn.textContent = 'Thêm Phòng ban';
            submitBtn.onclick = null;
            showAlert('Cập nhật phòng ban thành công!', 'success');
        };
    }
}

function editEmp(id) {
    const emp = employees.find(e => e.id === id);
    if (emp) {
        document.getElementById('deptSelect').value = emp.deptId;
        document.getElementById('empId').value = emp.empId;
        document.getElementById('empName').value = emp.name;
        document.getElementById('empGender').value = emp.gender;
        document.getElementById('empBirthYear').value = emp.birthYear;
        document.getElementById('empPosition').value = emp.position;
        document.getElementById('empOvertime').value = emp.overtime;

        const submitBtn = document.querySelector('#empForm button[type="submit"]');
        submitBtn.textContent = 'Cập nhật Nhân viên';
        submitBtn.onclick = function() {
            emp.deptId = document.getElementById('deptSelect').value;
            emp.empId = document.getElementById('empId').value;
            emp.name = document.getElementById('empName').value;
            emp.gender = document.getElementById('empGender').value;
            emp.birthYear = document.getElementById('empBirthYear').value;
            emp.position = document.getElementById('empPosition').value;
            emp.overtime = document.getElementById('empOvertime').value;
            emp.salary = emp.calculateSalary(emp.position, emp.overtime);

            updateEmpList();
            document.getElementById('empForm').reset();
            submitBtn.textContent = 'Thêm Nhân viên';
            submitBtn.onclick = null;
            showAlert('Cập nhật nhân viên thành công!', 'success');
        };
    }
}

// Các hàm tìm kiếm và lọc (có thể bổ sung sau)
function searchEmployees(keyword) {
    return employees.filter(emp => 
        emp.name.toLowerCase().includes(keyword.toLowerCase()) ||
        emp.empId.includes(keyword)
    );
}

function filterEmployeesByDepartment(deptId) {
    return employees.filter(emp => emp.deptId === deptId);
}

function filterEmployeesByPosition(position) {
    return employees.filter(emp => emp.position === position);
}

// Xuất dữ liệu
function exportToCSV(data, filename) {
    const csvContent = data.map(row => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function getEmployeeStatistics() {
    return {
        totalEmployees: employees.length,
        totalDepartments: departments.length,
        averageSalary: employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length,
        positionDistribution: employees.reduce((acc, emp) => {
            acc[emp.position] = (acc[emp.position] || 0) + 1;
            return acc;
        }, {})
    };
}
