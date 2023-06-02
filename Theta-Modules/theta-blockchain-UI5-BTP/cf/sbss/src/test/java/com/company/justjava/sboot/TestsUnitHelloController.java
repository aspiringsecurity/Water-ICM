package com.company.justjava.sboot;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = HelloController.class)
@ContextConfiguration(classes = HelloController.class)
public class TestsUnitHelloController {

  @Autowired
  private MockMvc restTemplate;

  @Test
  public void exampleTest() throws Exception {
    MvcResult result = this.restTemplate.perform(get("/")).andReturn();
    String content = result.getResponse().getContentAsString();
    assertThat(content).startsWith("Hello World");
  }
}