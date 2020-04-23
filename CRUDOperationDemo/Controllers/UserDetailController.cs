using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CRUDOperationDemo.Model;
using CRUDOperationDemo.Repository.UserRepository;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CRUDOperationDemo
{
    [Route("api/[controller]")]
    public class UserDetailController : Controller
    {
        public IUserDetailRepository _userDetailRepository;
        public UserDetailController(IUserDetailRepository userDetailRepository)
        {
            _userDetailRepository = userDetailRepository;

        }

        /// <summary>
        /// Get all user details
        /// </summary>
        /// <returns>list of user details</returns>
        [HttpGet]
        [Route("GetUserDetails")]
        //public IActionResult GetUserDetail()
        public List<UserDetail> GetUserDetail()
        {
            return _userDetailRepository.GetAllUserDetail();
        }

        /// <summary>
        /// Get user details by given id
        /// <param name="id">id of user detail </param>
        /// </summary>
        /// <returns>user details for given id</returns>
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [Route("GetUserDetailById")]
        public UserDetail GetUserDetailById([FromBody] int id)
        {
            return _userDetailRepository.GetUserDetailById(id);
        }

        /// <summary>
        /// Add new user details 
        /// <param name="model">user detail saved in database</param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [Route("AddUser")]
        public bool AddUserDetail([FromBody] UserDetail userDetail)
        {
            return _userDetailRepository.AddUserDetail(userDetail);
        }

        /// <summary>
        /// Update user details 
        /// <param name="model">updated user detail </param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [Route("UpdateUser")]
        public bool UpdateUserDetail([FromBody] UserDetail userDetail)
        {
            return _userDetailRepository.UpdateUserDetail(userDetail);

        }

        /// <summary>
        /// Delete user details 
        /// <param name="id">id of delete user detail </param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [Route("DeleteUser")]
        public bool DeleteUserDetail([FromBody] int id)
        {
            return _userDetailRepository.DeleteUserDetail(id);
        }


    }
}
