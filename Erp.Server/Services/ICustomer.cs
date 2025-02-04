﻿using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ICustomer
    {
        DbResult createOrUpdateCustomer(Customer customer);
        DbResult deleteCustomer(int id);
        Customer getCustomer(int id);
        Customer getCustomerByUsername(string username);
        DbResult getCustomerLogin(string username, string password);
        public IEnumerable<Customer> getCustomers();
        DbResult registerCustomer(Customer customer);
    }
}
