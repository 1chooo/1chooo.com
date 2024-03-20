# AWS Security Group V.S. Network ACL



NACL v.s. Security Group

在一場會議中，我們討論到了一個 Scenario，我們從 Security Group 關掉了 inbound 之後，我們還連得上去嗎？答案是可以。(因為 Security Group 是 stateful 的，所以當我們發出一個 request 的時候，我們的 response 會被允許回來，所以我們還是可以連得上去。但是如果我們把 NACL 關掉了，我們還連得上去嗎？答案是不行，因為 NACL 是 stateless 的，所以當我們發出一個 request 的時候，我們的 response 會被拒絕回來，所以我們連不上去。)


我們可以從一些觀點去討論 Security Group 和 NACL 的差異，

Here is a summary of the main differences between AWS Network Access Control Lists (NACLs) and Security Groups: 

● Layer of defense: NACLs operate at the subnet level and control traffic in and out of a VPC, while Security Groups operate at the instance level and control traffic to and from individual EC2 instances. 
● Scope of application: NACLs apply to all instances in a subnet, while Security Groups apply to individual instances. 
● Statefulness: NACLs are stateless and do not track the state of a connection, while Security Groups are stateful and allow traffic based on the response to previous traffic. 
● Default rule: NACLs have a default rule that denies all traffic, while Security Groups have a default rule that allows all traffic. 
● Order of rules: NACLs have a numbered list of rules that are applied in order, while Security Groups do not have an order of rules. 
● Ability to block traffic: NACLs can block traffic at the subnet level, while Security Groups can only block traffic at the instance level. 
● Network performance: NACLs can potentially have a larger impact on network performance because they operate at the subnet level and apply to all instances in the subnet, while Security Groups only operate at the instance level and only apply to individual instances. 

unplug network, tunnel




References:
- https://www.mygreatlearning.com/aws/tutorials/nacl-vs-security-group
- https://www.knowledgehut.com/tutorials/aws/nacl-vs-security-groups
- https://k21academy.com/amazon-web-services/aws-solutions-architect/aws-security-groups-vs-nacl/
- https://digitalcloud.training/aws-security-group-vs-nacl-key-differences/