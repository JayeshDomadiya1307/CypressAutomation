Feature: End to end eCommerce Validation

    Application Shop Regression

    @Regression
    Scenario: eCommerce Product Shopping
    Given I open eCommerce page
    When I add the products into cart
    And I select the conuntry and validate the price
    Then Submit and validate success message  

    @Smoke
    Scenario: Fill the Form and Submit
    Given I open eCommerce page
    When I fill the form details
        | name | gender |
        | Manish | Female |
        | Alex | Male |
    And validate the form behaviour
    Then I click on Shop